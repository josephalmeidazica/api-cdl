import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import styles from '@/styles/Blog.module.css'
import moment from 'moment'
import 'moment/locale/pt-br';

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
import { PlacementProps } from './location/[id]'

type Props = {
  feed: PlacementProps[]
}
var weekDay = moment().format('dddd').toUpperCase();

const Blog: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('')
  const [name,setName] = useState('')
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [type, setType] = React.useState(new Set(["Bares"]));
  const [rate, setRate] = React.useState('');
  const [locations, setLocations] = React.useState<Location[]>([])



  const setInputValue = (value: React.SetStateAction<string>) =>{
    setName(value);
  }

  const filter = () =>{
    console.log();
    setLocations(arr => [...arr, new Location(name,type.values().next().value,rate)]);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, authorEmail }
      await fetch(`/api/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div >
    <Layout >
      <div >
        <h2>{weekDay}</h2>
        <h3>{ moment()
      .utcOffset('-03:00')
      .format('DD/MM/YYYY hh:mm:ss')}</h3>
      </div>
      <div>
        <form onSubmit={submitData} onChange={() => console.log('mudou')}>
          <Spacer y={2.5} />
          <Input
            size="xl"
            onChange={(e) => setInputValue(e.target.value)}
            clearable
            labelPlaceholder="Buscar estabelecimentos"
            contentLeft={
              <FcSearch />
            }
          />
          <h3>{name}</h3>
          <h3>{rate}</h3>
          <h3>{type}</h3>
          <Spacer y={0.5} />
          <Dropdown>
          <Dropdown.Button light>{type}</Dropdown.Button>
          <Dropdown.Menu
          aria-label="Multiple selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          typeKeys={type}
          //@ts-ignore
          onSelectionChange={setType}>
            <Dropdown.Item key="Bares">Bares</Dropdown.Item>
            <Dropdown.Item key="Restaurantes">Restaurantes</Dropdown.Item>
            <Dropdown.Item key="Sorveterias">Sorveterias</Dropdown.Item>
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
        {props.feed.map((place) => (
          <><Card
            isPressable
            isHoverable
            variant="flat"
            css={{ mw: "400px" }}
          >
            <Card.Body
            onClick={() => Router.push('/location/[id]', `/location/${place.id}`)}
            >
              <Text> {place.nome}</Text>
              <Text> <FaStar /> {place.nota}   <BiMap /> {place.descricao}</Text>
            </Card.Body>
          </Card><Spacer y={0.5} /></>
        ))}
        </Grid.Container>
      </div>
    </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.estabelecimento.findMany()
  return {
    props: { feed },
  }
}

export default Blog
