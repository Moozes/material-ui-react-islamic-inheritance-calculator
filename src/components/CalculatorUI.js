

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { 
    TextField,
    Input,
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import path_diagram from './calculatorAlgorithme';
// console.log(path_diagram);

const useStyles = makeStyles(theme => ({
    half : {
        // width : "50%"
    }
}))

const TABLE = [
    {
        relation : "wife",
        number : 0
    },
    {
        relation : "husband",
        number : 0
    },
    {
        relation : "mother",
        number : 0
    },
    {
        relation : "father",
        number : 0
    },
    {
        relation : "paternal grandfather",
        number : 0
    },
    {
        relation : "maternal grandmother",
        number : 0
    },
    {
        relation : "paternal grandmother",
        number : 0
    },
    {
        relation : "daughter",
        number : 0
    },
    {
        relation : "son",
        number : 0
    },
    {
        relation : "son's son",
        number : 0
    },
    {
        relation : "son's daughter",
        number : 0
    },
    {
        relation : "mother's brother",
        number : 0
    },
    {
        relation : "mother's sister",
        number : 0
    },
    {
        relation : "full brother",
        number : 0
    },
    {
        relation : "full sister",
        number : 0
    },
    {
        relation : "father's brother",
        number : 0
    },
    {
        relation : "father's sister",
        number : 0
    },
    {
        relation : "full brother's son",
        number : 0
    },
    {
        relation : "paternal uncle's son",
        number : 0
    },
    {
        relation : "father's full brother",
        number : 0
    },
    {
        relation : "father's paternal uncle",
        number : 0
    },
    {
        relation : "full paternal uncle's son",
        number : 0
    },
    {
        relation : "father's paternal uncle's son",
        number : 0
    },
]

function the_max(relation) {
    if(
        relation == "husband" ||
        relation == "mother" ||
        relation == "father" ||
        relation == "paternal grandfather" ||
        relation == "maternal grandmother" ||
        relation == "paternal grandmother" 
    ) return 1;
    if(relation == "wife") return 4;
    return undefined;
}

function index_of_member(table, relation) {
    let i = 0;
    for(i = 0; i < table.length; i++)
        if(table[i].relation == relation)
            break;
    if(i>=table.length) return -1;
    return i;
}

export default (props) => {
    const classes = useStyles(props);
    const [table, setTable] = useState(TABLE);
    const [resultTable, setResultTable] = useState([]);

    const handleChange = e => {
        let newTable = [...table];
        let index = index_of_member(table, e.target.name);
        newTable[index].number = parseInt(e.target.value);
        setTable(newTable); 
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(table);
        let inheritance_result_table = [];
        path_diagram(table, inheritance_result_table);
        setResultTable(inheritance_result_table);
    }
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper}  >
                    <Table aria-label="simple table" size="small" >
                    <TableHead>
                        <TableRow>
                        <TableCell>Familly Memeber</TableCell>
                        <TableCell align="right">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {table.map(member => (
                                <TableRow key={member.relation}>
                                    <TableCell component="th" scope="row">
                                        {member.relation}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Input
                                            type="number"
                                            inputProps={{
                                                min:0,
                                                max:the_max(member.relation),
                                                step:"1"
                                            }}
                                            value={member.number}
                                            onChange={handleChange}
                                            name={member.relation}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell component="th" scope="row" align="left" >
                                    <Button variant="outlined" type="submit">calculate</Button>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            </form>
            </Grid>

            <Grid item xs={12} md={6}>
            <Typography
                align="center"
                variant="h4"
            >
                THE RESULT TABLE
            </Typography>
            {resultTable.length != 0 ? (
                 <TableContainer component={Paper}>
                 <Table className={classes.table} size="small" aria-label="a dense table">
                   <TableHead>
                     <TableRow>
                       <TableCell>Category</TableCell>
                       <TableCell align="right">Share (%)</TableCell>
                       <TableCell align="right">reason</TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>

                     {resultTable.map((elm) => (
                       <TableRow key={elm.relation}>
                         <TableCell component="th" scope="row">
                           {elm.relation}
                         </TableCell>
                         <TableCell align="right">{Math.round(elm.share*10000)/100}</TableCell>
                         <TableCell align="right">{elm.reason}</TableCell>
                       </TableRow>
                     ))}
                     
                   </TableBody>
                 </Table>
               </TableContainer>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>tarika for "dawi arham" or state treasury</TableCell>
                        </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            )}
            </Grid>
        </Grid>
        </>
    )
}