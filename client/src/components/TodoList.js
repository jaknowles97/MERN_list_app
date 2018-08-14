import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class TodoList extends Component {

    componentDidMoumt() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        const { items } = this.props.item;
        return(
            <Container>
                {/* <Button dolor="dark" atyle={{marginBottom: '2rem'}} onClick={() => {
                    const name = prompt('Enter Item');
                    if(name) {
                        this.setState(state => ({
                            items: [...state.items, { id: uuid(), name}]
                        }));
                    }
                }}
                >Add Item
                </Button> */}

                <ListGroup>
                    <TransitionGroup className="todo-list">
                      {items.map(({ id, name }) => (
                          <CSSTransition key={id} timewout={500} classNames="fade">
                            <ListGroupItem>
                            <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, id)}
                            >
                                &times;
                            </Button>
                            {name}
                            </ListGroupItem>
                          </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );   
    }
}

TodoList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(TodoList);