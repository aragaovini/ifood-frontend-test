import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Container,
    Row,
    Col
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

const goToPlaylist = urls => window.location = urls.spotify

const List = ({ items }) => {
    return (
        <Container>
            <Row>
                { items.map(({ name, images, external_urls }) => (
                    <Col>
                        <ListItem onClick={() => goToPlaylist(external_urls)}>
                            <PlaylistImage 
                                className="playlist-image" 
                                src={images[0].url}
                            />
                            <PlaylistName>{ name }</PlaylistName>
                        </ListItem>
                    </Col>
                ))}
                
            </Row>
        
        </Container>
    )
}

List.propTypes = {
    items: PropTypes.array
}

export default List