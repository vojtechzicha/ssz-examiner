import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Heading, Subheading } from '~/catalyst/heading'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarSection,
} from '../catalyst/sidebar'
import { useState } from 'react'
import { useParams } from '@remix-run/react'

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

const posts = import.meta.glob('../exam/**/*.mdx', {
  eager: true,
  exhaustive: true,
})
// const allTopics: any = (await import('../exam/index.json')).default
import allTopics from '../exam/index.json'

export default function Index() {
  const [currentId, setCurrentId] = useState(1)
  const { subject } = useParams()

  const topics = allTopics[subject],
    currentTopic = topics.find(topic => topic.id === currentId),
    Content = posts[`../exam/${subject}/${currentTopic?.file}.mdx`]?.default

  return (
    <>
      <Sidebar>
        <SidebarBody>
          <SidebarSection>
            {topics.map((topic: ContentProps) => (
              <SidebarItem
                key={topic.id}
                href='/'
                onClick={() => {
                  setCurrentId(topic.id)
                }}
              >
                {topic.name}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarBody>
      </Sidebar>
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
