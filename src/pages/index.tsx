/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { graphcmsClient } from '../graphql/client'
import { GET_ALL_LPS, GET_CONTENT } from '../graphql/queries'

type Image = {
  url: string
}

type Navigation = {
  name: string
  href: string
  type: Type
}

enum Type {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

type ContentProps = {
    logo: Image,
    navigation: Navigation []
    title: string,
    highlight: string,
    description: string,
    action: Navigation[],
    hero: Image
}

type Content ={
  content: ContentProps
}

export default function Home({ content }: Content) {
  const {title, action, description, hero, highlight, navigation, logo} = content
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#">
                      <img
                        alt="Workflow"
                        className="h-8 w-auto sm:h-10"
                        src={logo?.url}
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <span className="sr-only">Menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  { navigation?.map(item => (
                    <a
                      key={item?.name}
                      href={item?.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item?.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src={logo?.url}
                        alt="logo"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <span className="sr-only">Fechar</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation?.map(item => (
                      <a
                        key={item?.name}
                        href={item?.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item?.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100"
                  >
                    Entrar
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{title}</span>{' '}
                {highlight && <span className="block text-blue-600 xl:inline">{ content?.highlight }</span> }
              </h1>
              {!!description && <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {description}
              </p> }
              { action?.length > 0 && (
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start flex-wrap gap-2">
                {
                   action?.map ( (action, index) => ( 
                    <div key={`${action.name}-${index}`}>
                      {action?.type === 'primary' ? 
                      (<div className="rounded-md shadow">
                        <a
                          href={action?.href}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          {action?.name}
                        </a>
                      </div>) : 
                      (
                        <div className="mt-3 sm:mt-0">
                          <a
                            href={action?.href}
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-yellow-400 hover:bg-yellow-300 md:py-4 md:text-lg md:px-10"
                          >
                            {action?.name}
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                }
                
              </div>)}
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={hero?.url}
          alt="banner"
        />
      </div>
    </div>
  );
}


export const getStaticProps =  async () => {
    const data = await graphcmsClient.request(GET_ALL_LPS)
    const landingPageId = data?.landingPages[0]?.id
    const contentData = await graphcmsClient.request(GET_CONTENT, { id: landingPageId})
    const content: Content = contentData?.landingPage
    return {
      props: {
        content
      }
    }
}