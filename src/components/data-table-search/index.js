import { TextField } from "@mui/material";
import React from "react";

const Searcher = ({ type, titre, value, placeholder, onChange , fullWidth , size="small" , label="Rechercher"}) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="d-flex align-items-center">
                    <div className="mr-2">
                        <h5 className="mb-0">{titre}</h5>
                    </div>
                    <TextField 
                    id="outlined-basic" 
                    label={label}
                    variant="outlined"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    size={size}
                    fullWidth

                     />
                </div>
            </div>
        </div>
    );
};

export default Searcher;
