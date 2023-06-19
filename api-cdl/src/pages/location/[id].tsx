import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import prisma from '../../lib/prisma'
import styles from '@/styles/Post.module.css'
import { FaStar } from 'react-icons/fa';
import { BiMap } from 'react-icons/bi'

export type PlacementProps = {
  rua: string
  numero: string
  bairro: string
  cep: string
  id: number
  nome: string
  nota: string
  descricao: string
}

const Post: React.FC<PlacementProps> = (props) => {
  let title = props.nome
  console.log(props)
  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p><FaStar /> {props.nota}   <BiMap /> {props.rua} {props.numero}, {props.bairro} - {props.cep} </p>
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
  })

  id = Number(post?.idLocalizacao)

  const location = await prisma.localizacao.findUnique({
    where: { id },
  })
  return { props: { ...post, ...location } }
}

export default Post
