import React from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'

const SearchModal = () => {

    const searchModal = useSearchModal()
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
    />
  )
}

export default SearchModal