import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Container } from 'react-bootstrap';
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
        justify-content: flex-end;
        label {
            text-align: left;
        }
        .react-datepicker__input-container {
            width: 100%;
            input {
                width: 100%;
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
        }
    `

    componentWillReceiveProps({ handleFieldsChange }) {
        if (handleFieldsChange) {
            this.setState({
                handleFieldsChange
            })
        }
    }

    handleChange = ({id: field, validation }, value, formattedValue) => {
        if (validation && validation.primitiveType === 'INTEGER') {
            value = Number(value)
            if (validation.min !== undefined && validation.max !== undefined) {
                if (value < validation.min || value > validation.max) {
                    this.setState({
                        [field]: 0
                    })
                    return false
                }
            }
        }

        // Country USA is coming as 'en_US' and Spotify API doesnt accept it
        if (field === 'country' && value.includes('_')) {
            value = value.split('_')[1]
        }

        this.setState({
            [field]: value
        }, () => {
            this.state.handleFieldsChange(field, formattedValue ? formattedValue : value)
        })
    }

    handleDate = (field, value) => {
        const { validation } = field
        let formattedDate = undefined
        if (validation && validation.pattern) {
            const splittedPattern = validation.pattern.split('T')
            const formattedPattern = [splittedPattern[0].toUpperCase(), 'T', splittedPattern[1]].join('')
            formattedDate = moment(value).format(formattedPattern)
        }
        this.handleChange(field, value, formattedDate)
    } 

    getNecessaryAttributes = ({ validation }) => {
        if (validation && validation.primitiveType === 'INTEGER') {
            const { min, max } = validation
            if (min !== undefined && max !== undefined) {
                return {
                    type: 'number',
                    min,
                    max
                }
            } else {
                return {
                    type: 'number'
                }
            }
        }
    }

    render() {
        const { filters } = this.props
        const { handleChange, DatePickerBox, getNecessaryAttributes } = this
        return (
            <Container>
                <Form className="form-box">
                    {filters && filters.map(filter => {
                        const { 
                            id,
                            name,
                            values,
                            validation,
                        } = filter

                        if (filter.values) {
                            return (
                                <Form.Group key={id}>
                                    <Form.Label>{name}</Form.Label>
                                    <Form.Control as="select" onChange={e => handleChange(filter, e.target.value)}>
                                        {values && values.map((value, index) => (
                                            <option key={index} value={value.value}>{value.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            )
                        } else {
                            if (validation && validation.entityType === 'DATE_TIME') {
                                return (
                                    <DatePickerBox key={id}>
                                        <label>{name}</label>
                                        <DatePicker
                                            selected={this.state[id]}
                                            onChange={(value) => this.handleDate(filter, value)}
                                            showTimeSelect
                                            timeIntervals={15}
                                            dateFormat="MMMM d, yyyy h:mm"
                                            timeCaption="time"
                                            timeFormat="HH:mm"/>
                                    </DatePickerBox>
                                )
                            } else if (id !== 'offset') {
                                return (
                                    <Form.Group key={id}>
                                        <Form.Label>{name}</Form.Label>
                                        <Form.Control
                                            onChange={(e) => handleChange(filter, e.target.value)}
                                            {...getNecessaryAttributes(filter)}
                                            />
                                    </Form.Group>
                                )
                            } else {
                                return null
                            }
                        }
                    })}
                </Form>
            </Container>
        )
    }
}

Filter.propTypes = {
    filters: PropTypes.array,
    onChange: PropTypes.func
}

export default Filter