import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const Form = () => {
    // state for url
    const [URL, setURL] = useState("")

    // state for inputs/key-value pairs
    const [inputList, setInputList] = useState([{ key: "", value: "" }]);
   
    // handle URL form change
    const handleURLChange = (e) => {
      setURL(e.target.value)
    }
    // handle key-value pair change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
   // handle remove button
    const handleRemove = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
  //handle add button
    const handleAdd = () => {
      setInputList([...inputList, { key: "", value: "" }]);
    };
    return (
        <div>
            <label>URL</label>
            <input name="URL" placeholder="Enter URL" value={URL} onChange={e => handleURLChange(e)}></input>
            {/* return however many key-value pairs are in the input list*/}
            {inputList.map((x, index) => {
            return (
                <div className="box">
                <label>Key</label>
                <input
                    name="key"
                    placeholder="Enter Key"
                    value={x.key}
                    onChange={e => handleInputChange(e, index)}
                />
                <label>Value</label>
                <input
                    name="value"
                    placeholder="Enter Value"
                    value={x.value}
                    onChange={e => handleInputChange(e, index)}
                />
                
                    {inputList.length !== 1 && <Button
                    style={{marginLeft:20}}
                    onClick={() => handleRemove(index)}>Remove</Button>}
                    {inputList.length - 1 === index && <Button style={{display:"block", marginTop:20}} onClick={handleAdd}>Add</Button>}
                
                </div>
            );
            })}
            {/* a lot of ternary logic that will take too much space to write out in if-else statements, personally I think this is more readable than a bunch of if-else blocks */}
            <div style={{ marginTop: 20 }}>
              <p style={{fontSize:30, backgroundColor:"#d3d3d3", padding:20}}>curl {URL}{(inputList[0].key != "" | inputList[0].value != "") ? inputList.map((x, i) => ((i == 0) & (x.key != "" | x.value != "") ? "?" : "") + encodeURI(x.key) + "=" + encodeURI(x.value) + (i != inputList.length - 1 & inputList.length > 1 ? "&" : "")) : ""}</p>
            </div>
        </div>
    )
}

export default Form
