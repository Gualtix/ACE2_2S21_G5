import React, { Component } from 'react'
import {
    DataTableCell,
    DataTableRow
} from '@rmwc/data-table';
import '@rmwc/data-table/styles';
import '@material/data-table/dist/mdc.data-table.css';
import '@rmwc/data-table/data-table.css';


export default class TableRowDatosArduino extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rowindex : props.rowindex ,
        }

        this.getRowsData = this.getRowsData.bind(this);
        this.removeRow = this.removeRow.bind(this);
    }  

    removeRow(){
        this.props.handleRemove(this.state.index)
    }

    onTrigger = (event) => {
        this.props.parentCallback(this.props.row.SKU);
    }

    getRowsData = function(){
        var items = [this.props.row];
        var keys = this.props.keys;
        return items.filter((item, idx) => idx < 3).map((row, index)=>{
        return <RenderRow key={index} data={row} keys={keys}/>
        })
    }
    
    render() {
        return (
            <DataTableRow>
                {this.getRowsData()}
            </DataTableRow>
        )
    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        if(props.data[key]==="true") return <DataTableCell key={key+props.data[key]+index}><span className="badge badge-success text-dark"><strong>SENTADO</strong></span></DataTableCell>
        if(props.data[key]==="false") return <DataTableCell key={key+props.data[key]+index}><span className="badge badge-warning text-dark"><strong>PARADO</strong></span></DataTableCell>
        return <DataTableCell key={key+props.data[key]+index}>{props.data[key]}</DataTableCell>//<td key={props.data[key]}>{props.data[key]}</td>
    })
}
