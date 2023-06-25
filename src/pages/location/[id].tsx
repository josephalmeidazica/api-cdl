import React, {useState, useEffect} from 'react'
import { GetServerSideProps, GetStaticProps  } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import prisma from '../../lib/prisma'
import styles from '@/styles/Post.module.css'
import { FaStar } from 'react-icons/fa';
import { BiMap } from 'react-icons/bi'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Table } from "@nextui-org/react";

export type PlacementProps = {
  local: Local
  id: number
  nome: string
  nota: string
  descricao: string
  distance: string,
  idLocalizacao: number,
  tipo: Type
  Horario: any
}

export type Type = {
  nome: string
}

export type Local = {
  rua: string
  numero: string
  bairro: string
  cep: string
  id: number
}

type Horario = {
  id: number
  dia: string
  horario: string
}

type UserLocation = {
  longitude: number,
  latitude: number
}

const Post: React.FC<PlacementProps> = (props) => {

  const [location, setLocation] = useState<UserLocation>()
  const [distance, setDistance] = useState('')

  const getUserLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({latitude,longitude})
      });
    } else {
      return 'error';
    }
  }

  const fetchData = () =>{}

  useEffect(() =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let addres = `${props.local?.rua},${props.local?.numero} - Bairro ${props.local?.bairro} - ${props.local?.cep}`
        console.log(JSON.stringify({origin: `${latitude},${longitude}`, destination: addres}))
    fetch('../api/distance',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({origin: `${latitude},${longitude}`, destination: addres})
    }).then((res) => res.json().then((data) => {
      console.log(data)
      setDistance(data);
    }))
      });
    }
  },[props.local?.bairro, props.local?.cep, props.local?.numero, props.local?.rua]);

  let title = props.nome
  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <h2><FaStar /> {props.nota} </h2>
        <h3><BiMap /> {distance}</h3>
        <h4> {props.local.rua} {props.local.numero}, {props.local.bairro} - {props.local.cep} </h4>
        <InfiniteScroll
          dataLength={1}
          next={fetchData}
          hasMore={false} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          height={300}
        >
        <ReactMarkdown>{props.descricao}</ReactMarkdown>
        </InfiniteScroll>
        <InfiniteScroll
          dataLength={7}
          next={fetchData}
          hasMore={false} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          height={300}
        >
          <Table
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
          <Table.Header>
            <Table.Column>Dia</Table.Column>
            <Table.Column>Horário</Table.Column>
          </Table.Header>
          <Table.Body items={props.Horario}>
          {(item) => (
            <Table.Row key={
              //@ts-ignore
              item.id}>
              {(columnKey) => <Table.Cell>{//@ts-ignore
              columnKey == '.0.0' ? item.dia : (item.horario == null ? 'Sem dados' : item.horario)}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
        </Table>
        </InfiniteScroll>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let id = Number(
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id,
  )
  const post = await prisma.estabelecimento.findUnique({
    where: { id },
    include: {local:true,Horario: true}
  })

  const times = await prisma.horario.findMany({
    where: {
      idEstabelecimento: id
    }
  })

  id = Number(post?.idLocalizacao)

  const location = await prisma.localizacao.findUnique({
    where: { id },
  })
  console.log({ ...post, ...location, ...times })
  return { props: { ...post, ...location, ...times } }
}

export default Post
