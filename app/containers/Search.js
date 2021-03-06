import React, { Component } from 'react'
import { connect } from 'react-redux'

import {getSearchResultFor} from '../reducers/Search'
import SearchInput from '../components/Search/Input'
import SearchResultList from '../components/Search/ResultList'
import SearchResult from '../components/Search/Result'

@connect(state => ({
  search: state
}))
export default class Search extends Component {

  componentDidMount () {
    const { routeParams, dispatch, search } = this.props
    if (!search.loaded && routeParams.query) {
      dispatch(getSearchResultFor(routeParams.query))
    }
  }

  render () {
    const { payload } = this.props.search
    const { query } = this.props.routeParams
    const { products } = payload || {}

    if (products) {
      return (
        <div>
          <SearchInput defaultValue={query} placeholder='Search for a product or brand' handleOnChange={::this.handleOnChange} handleOnSubmit={::this.handleOnSubmit} />
          <SearchResultList>
            { products.map( (product) => { return <SearchResult key={product.id} {...product} /> }) }
          </SearchResultList>
        </div>
      )
    } else {
      return (
        <div>
          <SearchInput placeholder='Search for a product or brand' handleOnChange={::this.handleOnChange} handleOnSubmit={::this.handleOnSubmit} />
        </div>
      )
    }
  }

  handleOnChange (e) {
    const { dispatch } = this.props
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleOnSubmit (e) {
    e.preventDefault()
    const { history, dispatch } = this.props
    const { searchTerm } = this.state
    history.pushState(null, '/'+searchTerm)
    dispatch(getSearchResultFor(searchTerm))
  }
}
