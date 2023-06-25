import React, {useState, useEffect} from 'react'
import { GetServerSideProps, GetStaticProps  } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import prisma from '../../lib/prisma'
import styles from '@/styles/Post.module.css'
import { FaStar } from 'react-icons/fa';
import { BiMap } from 'react-icons/bi'

export type PlacementProps = {
  local: Local
  id: number
  nome: string
  nota: string
  descricao: string
  distance: string,
  idLocalizacao: number,
  tipo: Type
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
        <h1>{title}</h1>
        <h2><FaStar /> {props.nota} </h2>
        <h3><BiMap /> {distance}</h3>
        <p> {props.local.rua} {props.local.numero}, {props.local.bairro} - {props.local.cep} </p>
        <ReactMarkdown>{props.descricao}</ReactMarkdown>
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
    include: {local:true}
  })

  id = Number(post?.idLocalizacao)

  const location = await prisma.localizacao.findUnique({
    where: { id },
  })
  return { props: { ...post, ...location } }
}

export default Post
