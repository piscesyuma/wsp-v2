'use client'

import LoginView from '../../../components/Login/login';

interface LoginPageProps {
  params: {
    locale: string
  }
}

export default function Page({params}: LoginPageProps) {
  return (
    <LoginView />
  )
}