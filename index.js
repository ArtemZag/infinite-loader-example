import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import Immutable from 'immutable';

import Example from './InfiniteLoader.example'
import { generateRandomList } from 'demo/utils'

const list = Immutable.List(generateRandomList())

ReactDom.render(
	<Example list={list} />,
	document.getElementById('root')
)