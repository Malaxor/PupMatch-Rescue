import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { login } from '../../api'
import { Input } from '../Controls'
import { Button } from '../Buttons'

export function LoginForm ({ isOpen, handleCloseModal, handleLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const { name, email } = formData

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isDisabled = !name || !email || !isEmailValid

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit (e) {
    e.preventDefault()
    await login({ name: name.trim(), email: email.trim() })
    setFormData({ name: '', email: '' })
    handleCloseModal()
    handleLogin()
    navigate('/PupMatch-Rescue/dog-search-list')
  }

  return (
    <Modal
      ariaHideApp={false}
      id='modal'
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
    >
      <form id='navbar__form' onSubmit={handleSubmit}>
        <Input
          styling='w-100'
          placeholder='name'
          value={name}
          name='name'
          onChange={handleChange}
        />
        <Input
          styling='w-100'
          placeholder='email'
          value={email}
          name='email'
          onChange={handleChange}
        />
        <Button styling='btn form-btn w-100' disabled={isDisabled}>
          Login
        </Button>
      </form>
    </Modal>
  )
}
