import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Heading, Subheading } from '~/catalyst/heading'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarSection,
} from '../catalyst/sidebar'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

type ContentProps = {
  id: number
  name: string
  description: string
  file: string
}

const posts = import.meta.glob('../exam/**/*.mdx', { eager: true })

export default function Index() {
  const currentPost =
      Object.keys(posts)[Math.floor(Math.random() * Object.keys(posts).length)],
    Content = posts[currentPost]?.default

  return (
    <>
      {Content && (
        <Content
          components={{
            h1: (props: any) => (
              <Heading className='mt-4' {...props} level={1} />
            ),
            h2: (props: any) => (
              <Heading className='mt-4' {...props} level={2} />
            ),
            h3: (props: any) => (
              <Subheading className='mt-2' {...props} level={3} />
            ),
            h4: (props: any) => (
              <Subheading className='mt-2' {...props} level={4} />
            ),
            ul: (props: any) => (
              <ul
                className='space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'
                {...props}
              />
            ),
            ol: (props: any) => (
              <ol
                className='space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400'
                {...props}
              />
            ),
          }}
        />
      )}
    </>
  )
}
