import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Container,
    Row,
    Col,
    Pagination
} from 'react-bootstrap'

const hoveredImageStyle = `
    transform: scale(1.15);
`

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 18px;
    &:hover .playlist-image {
        ${hoveredImageStyle}
    }
`

const PlaylistImage = styled.img`
    width: 175px;
    height: 175px;
    transform: scale(1);
    transition: transform .3s;
`

const PlaylistName = styled.h3`
    font-size: 14px;
    font-weight: 400;
    margin-top: 18px;
    &:hover ${PlaylistImage} {
        ${hoveredImageStyle}
    }
`

class List extends Component {
    state = {
        limit: 1,
        pages: 0,
        items: [],
        currentPage: 1
    }

    componentWillReceiveProps({ items, limit, total, mustResetPagination }) {
        this.setState({
            items,
            limit,
            currentPage: mustResetPagination ? 1 : this.state.currentPage
        }, () => {
            this.calculatePagination(total)
        })
    }

    goToPlaylist = urls => window.location = urls.spotify

    calculatePagination = total => {
        const { limit } = this.state
        const pages = Math.ceil(total / limit)
        this.setState({
            pages
        })
    }

    changePage = (page) => {
        const { handlePageChange } = this.props
        const { limit } = this.state
        const offset = (page - 1) * limit
        this.setState({ 
            currentPage: page
        }, () => handlePageChange(offset))
    }

    render() {
        const { items, pages, currentPage } = this.state

        const PagesComponent = () => {
            let pageItems = []
            if (pages > 1) {
                for(let page = 1; page <= pages; page++) {
                    pageItems.push(
                        <Pagination.Item 
                            className={currentPage === page ? 'selected-page' : ''}
                            onClick={() => this.changePage(page)}
                            key={page}>
                            {page}
                        </Pagination.Item>
                    )
                }
            }
            return pageItems
        }

        return (
        <Container>
            <Row>
                { items.map(({ name, images, external_urls }, index) => (
                    <Col key={index}>
                        <ListItem title={`Go to ${name}`} onClick={() => this.goToPlaylist(external_urls)}>
                            <PlaylistImage
                                alt={`${name} playlist`}
                                className="playlist-image" 
                                src={images[0].url}
                            />
                            <PlaylistName>{ name }</PlaylistName>
                        </ListItem>
                    </Col>
                ))}
            </Row>

            <Pagination>
                <PagesComponent/>
            </Pagination>
        </Container>
        )
    }
}

List.propTypes = {
    items: PropTypes.array,
    limit: PropTypes.number,
    total: PropTypes.number,
    mustResetPagination: PropTypes.bool
}

export default List