import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import styled from 'styled-components';

class Filter extends Component {

    state = {
        handleChange: () => {}
    }

    DatePickerBox = styled.div`
        display: flex;
        flex-direction: column;
        .react-datepicker__input-container input {
            height: calc(1.5em + .75rem + 2px);
            padding: .375rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            outline: none;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
    `

    componentWillReceiveProps({ handleFieldsChange }) {
        if (handleFieldsChange) {
            this.setState({
                handleFieldsChange
            })
        }
    }

    handleChange = (field, value, formattedValue) => {
        if (field === 'country' && value.includes('_')) {
            // Country USA is coming as 'en_US and Spotify API doesnt accept it'
            value = value.split('_')[1]
        }

        this.setState({
            [field]: value
        })
        this.state.handleFieldsChange(field, formattedValue ? formattedValue : value)
    }

    handleDate = (field, value, pattern) => {
        const splittedPattern = pattern.split('T')
        const formattedPattern = [splittedPattern[0].toUpperCase(), 'T', splittedPattern[1]].join('')
        const formattedDate = moment(value).format(formattedPattern)
        this.handleChange(field, value, formattedDate)

    } 

    render() {
        const { filters } = this.props
        const { handleChange, DatePickerBox } = this
        return (
            <Form>
                {filters && filters.map(filter => {
                    const { 
                        id,
                        name,
                        values,
                        validation,
                    } = filter

                    if (filter.values) {
                        return (
                            <Form.Group key={filter.id} controlId="formBasicEmail">
                                <Form.Label>{name}</Form.Label>
                                <Form.Control as="select" onChange={e => handleChange(id, e.target.value)}>
                                    {values && values.map((value, index) => (
                                        <option key={index} value={value.value}>{value.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )
                    } else {
                        if (validation && validation.entityType === 'DATE_TIME') {
                            return (
                                <DatePickerBox key={filter.id}>
                                    <label>{name}</label>
                                    <DatePicker
                                        selected={this.state[id]}
                                        onChange={(value) => this.handleDate(id, value, validation.pattern)}
                                        showTimeSelect
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        timeFormat="HH:mm"/>
                                </DatePickerBox>
                            )
                        } else {
                            return (
                                <Form.Group key={filter.id}>
                                    <Form.Label>{name}</Form.Label>
                                    <Form.Control onChange={(e) => handleChange(id, e.target.value)}></Form.Control>
                                </Form.Group>
                            )
                        }
                    }
                })}
            </Form>
        )
    }
}

Filter.propTypes = {
    filters: PropTypes.array,
    onChange: PropTypes.func
}

export default Filter