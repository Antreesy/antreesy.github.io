import React from 'react'
import { Button, ButtonGroup, Box, List, ListItem, Typography } from '@mui/material';

export default function TicTac() {

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
        return null;
    }

    function Square(props) {
        return (
            <Button
                children={props.value}
                onClick={props.onClick}
                variant='outlined'
                size='large'
                color='warning'
                sx={{
                    width:'60px',
                    height:'60px',
                    fontSize:'40px',
                    borderRadius:'0'
                }}
            />
        )
    }
  
    class Board extends React.Component {
        renderSquare(i) {
            return (
                <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />
            );
        };

        render() {
            const row = (i) => {
                return [0,1,2].map((j) => this.renderSquare(3*i+j));
            }

            const field = [0,1,2].map((i) => {
                return (
                    <ButtonGroup sx={{marginTop:'-1px'}}>
                        {row(i)}
                    </ButtonGroup>
                )
            })

            return (
                <Box sx={{
                        display: "flex",
                        flexDirection:"column"
                    }}
                    children={field}
                />
            );
        }
    }
  
    class Game extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                history: [{
                    squares: Array(9).fill(null),
                }],
                stepNumber: 0,
                xIsNext: true,
            };
        }

        handleClick(i) {
            const history = this.state.history.slice(0, this.state.stepNumber +1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {return;}
            squares[i] = this.state.xIsNext ? "X" : "O";
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            });
        }

        jumpTo(step) {
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            })
        }

        render() {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);

            const moves = history.map((step, move) => {
                const desc = move ?
                  'Go to turn' + move :
                  'Go to start';
                return (
                    <ListItem key={move}>
                        <Button
                            variant="contained"
                            color={(move % 2) ? 'secondary' : 'primary'}
                            size='small'
                            children={desc}
                            onClick={() => this.jumpTo(move)}
                        
                        />
                    </ListItem>
                );
            });

            let status;
            if (winner) {
                status = 'Winner is ' + winner;
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? "Х" : "O");
            }

            return (
            <Box sx={{display:"flex", paddingTop:3}}>
                <Box sx={{marginRight:3}}>
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                </Box>
                <Box>
                <Typography variant='h6' children={status} />
                <List dense children={moves} />
                </Box>
            </Box>
            );
        }
    }



  return <Game />
}