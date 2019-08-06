import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class Filter extends Component {

    state = {
        handleChange: () => {}
    }

    componentWillReceiveProps({ handleFieldsChange }) {
        if (handleFieldsChange) {
            this.setState({
                handleFieldsChange
            })
        }
    }

    handleChange = (field, value, formattedValue) => {
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
        const { handleChange } = this
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
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>{name}</Form.Label>
                                <Form.Control as="select" onChange={e => handleChange(id, e.target.value)}>
                                    {values && values.map(value => (
                                        <option value={value.value}>{value.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )
                    } else {
                        if (validation && validation.entityType === 'DATE_TIME') {
                            return (
                                <DatePicker
                                    selected={this.state[id]}
                                    onChange={(value) => this.handleDate(id, value, validation.pattern)}
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time"
                                    timeFormat="HH:mm"/>
                            )
                        } else {
                            return (
                                <Form.Group>
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