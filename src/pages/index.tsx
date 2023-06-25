import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import styles from '@/styles/Blog.module.css'
import moment from 'moment'
import 'moment/locale/pt-br';
import InfiniteScroll from 'react-infinite-scroll-component';

import Router from 'next/router'
import { Dropdown } from "@nextui-org/react";
import { Radio } from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";
import { FcSearch } from 'react-icons/fc';
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { FaStar } from 'react-icons/fa';
import { BiMap } from 'react-icons/bi'
import { Button } from "@nextui-org/react";
import {Location} from '../models/Location';
import { Local, PlacementProps, Type } from './location/[id]'

type Props = {
  feed: PlacementProps[],
  types: Type[]
}
var weekDay = moment().format('dddd').toUpperCase();

const Blog: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('')
  const [name,setName] = useState('UNA')
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [type, setType] = React.useState(new Set(["Educacional"]));
  const [rate, setRate] = React.useState('3');
  const [locations, setLocations] = React.useState<Location[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)


  const setInputValue = (value: React.SetStateAction<string>) =>{
    setName(value);
  }

  const filter = () =>{
    console.log();
    setLocations(arr => [...arr, new Location(name,type.values().next().value,rate)]);
  }

  const fetchData = () =>{}

  useEffect(() =>{
    setLoaded(true);
  },[loaded]);


  return (
    <div >
    <Layout >
      <div >
        <h2 color='white'>{weekDay}</h2>
        <h3>{ moment()
      .utcOffset('-03:00')
      .format('DD/MM/YYYY hh:mm:ss')}</h3>
      </div>
      <div>
        <form onChange={() => console.log('mudou')}>
          <Spacer y={2.5} />
          <Input
            size="xl"
            onChange={(e) => setInputValue(e.target.value)}
            clearable
            value={name}
            labelPlaceholder="Buscar estabelecimentos"
            contentLeft={
              <FcSearch />
            }
          />
          <Spacer y={0.5} />
          <Dropdown>
          <Dropdown.Button light>{type}</Dropdown.Button>
          <Dropdown.Menu
          aria-label="Multiple selection actions"
          color="secondary"
          placeholder='Tipo'
          disallowEmptySelection
          selectionMode="single"
          typeKeys={type}
          //@ts-ignore
          onSelectionChange={setType}
          items={props.types}>
            {(item) => (
          <Dropdown.Item
            //@ts-ignore
            key={item.nome}
          >
            {//@ts-ignore
            item.nome}
          </Dropdown.Item>
        )}
          </Dropdown.Menu>
        </Dropdown>
        <Spacer y={0.5} />
        <Radio.Group
          label="Avaliação"
          orientation="horizontal"
          color="secondary"
          value={rate}
          onChange={setRate}
        >
          <Radio value="5">5</Radio>
          <Radio value="4">4</Radio>
          <Radio value="3">3</Radio>
          <Radio value="2">2</Radio>
          <Radio value="1">1</Radio>
        </Radio.Group>
        <Spacer y={1} />
        <Button
        auto
        bordered
        color="primary"
        icon={<FcSearch />}
        onPress={filter}
        >
          Filtrar
        </Button>
        </form>
        <Spacer y={1} />
        <Grid.Container gap={2} justify="flex-start">
        <InfiniteScroll
          dataLength={props.feed.length}
          next={fetchData}
          hasMore={false} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          height={400}
          endMessage={<p>No more data to load.</p>}
        >
        {props.feed.map((place) => {
          console.log(place)
          console.log(type.values().next().value,name,rate)
          let condition = type.values().next().value == "Tipo" ? true : false
          if(place.tipo.nome == type.values().next().value
          && place.nome.toLowerCase().includes(name.toLowerCase()) && place.nota >= rate)
          {
            return (
              <>
              <Card
                isPressable
                isHoverable
                variant="flat"
                css={{ mw: "400px", mh:"180px" }}
              >
                <Card.Body
                onClick={() => Router.push('/location/[id]', `/location/${place.id}`)}
                >
                  <Text> {place.nome}</Text>
                  <Text> <FaStar /> {place.nota} <BiMap />{place.local.rua},{place.local.numero} {place.local.bairro} </Text>
                </Card.Body>
              </Card><Spacer y={0.5} /></>
            )
          }
        })}
        </InfiniteScroll>
        </Grid.Container>
      </div>
    </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.estabelecimento.findMany({
    include: {
      local: true,
      tipo: true
    }
  })
  const types = await prisma.tipo.findMany()
  return {
    props: {
      feed,
      types
    },
  }
}

export default Blog
