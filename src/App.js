import React from 'react';
import logo from './logo.svg';
import './App.css';


const data = [{a:'sasss',b:"asasasas",dfsfdsf:'dfsddsfdsdsff'}]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>
                a
              </th>
              <th>
                b
              </th>
            </tr>
          </thead>
          <tbody>
              {data.map(e => {
                return <tr>{
                  Object.keys(e).map((key) => <td>{e[key]}</td>)
                }</tr>
              })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
