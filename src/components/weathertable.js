import React from 'react';
import axios from 'axios';

export default class WeatherTable extends React.Component {
  state = {
    dates: [],
    arrayOfRows: []
  }

  componentDidMount() {
    axios.get(`https://scaleotron.com/weather/app/api/data.php`)
      .then(res => {

        const weathers = res.data;
        const dates = [];

        weathers.forEach(element => {
          if (!dates.includes(element.date)) {
            dates.push(element.date);
          }
        });

        dates.pop();

        const rows = weathers.reduce(
          (rowBuilder, { location, rainfall }) => {
            if (!rowBuilder[location]) rowBuilder[location] = [];
            rowBuilder[location].push(rainfall);
            return rowBuilder;
          }, {});

        const arrayOfRows = []

        for (const [key, value] of Object.entries(rows)) {
          var newRow = [`${key}`.replace(/\s\s+/g, ' ')];
          const rowWithValue = newRow.concat(value);
          arrayOfRows.push(rowWithValue);
        };

        this.setState({ dates, arrayOfRows });
        
      })
  }

  render() {
    return (
      <table className="content-table">
        <thead>
          <tr>
            <td></td>
            {
              this.state.dates
                .map(date =>
                  <th>{date}</th>
                )
            }
          </tr>
        </thead>
        <tbody>

          {
            this.state.arrayOfRows
              .map(row =>
                <tr>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>{row[5]}</td>
                </tr>
              )
          }

        </tbody>
      </table>
    )
  }
}
