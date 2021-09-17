import React, { Component } from 'react'
import TableRowDatos from './TableRowHistorial';
import {
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableContent,
    DataTableRow,
    DataTableHeadCell
} from '@rmwc/data-table';
import '@rmwc/data-table/styles';
import '@material/data-table/dist/mdc.data-table.css';
import '@rmwc/data-table/data-table.css';

export default class TableDatos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        }
        this.keys = [];
        this.getHeader = this.getHeader.bind(this);
        this.addRow = this.addRow.bind(this)
        this.removeRow = this.removeRow.bind(this)
    }

   addRow(data){
        var {rows} = this.state
        rows.push(data);
        this.setState({rows: rows})
    }

    removeRow = (index) => {
        var {rows} = this.state;
        while(rows.length > 0){
            rows.splice(index, 1);
        }

        this.setState({rows: rows})
    }

    getHeader = () => {
        var keys = this.props.data;
        this.keys = keys;
        return keys.map((key, index)=>{
        return <DataTableHeadCell key={key}>{key.toUpperCase()}</DataTableHeadCell>
        })
    }

    agregar_datos = (array) => {
        if(array.length > 0)
        {
            for(var aux of array)
                this.addRow(aux);
        }
    }

    handleCallback = (childData) =>{
        this.props.parentCallback(childData);
    }

    render() {
        return (
            <div>
                <DataTable
                    stickyRows={1}
                    style={{ height: '350px', width: '100%' }}>
                    <DataTableContent>
                        <DataTableHead>
                            <DataTableRow>
                                {this.getHeader()}
                            </DataTableRow>
                        </DataTableHead>
                        <DataTableBody>
                            {
                                this.state.rows.map((row, index) => { return <TableRowDatos parentCallback={this.handleCallback} key={index} row={row} keys={this.keys} rowindex = {index + 1}/>} )
                            }
                        </DataTableBody>
                    </DataTableContent>
                </DataTable>
            </div>
        )
    }
}
