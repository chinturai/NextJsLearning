import Form from 'next/form'
import ResetButton from './ResetButton';

const SearchForm = () => {
  const query = "test";

  

  return (
    <Form action="/" scroll={false} className='search-form'>
      <input 
      name='query'
      defaultValue={query}
      className='search-input'
      placeholder='Search for Start-ups'
      />

      <div className='flex gap-2'>
        { query && (
          <ResetButton />
        )}

        <button type='submit' className='search-btn'>
          🔍
        </button>
      </div>
    </Form>
  )
} 

export default SearchForm