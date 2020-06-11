import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import config from '../../config'

const Charts = (props) => {
  const [data, setData] = useState([])
  const [hasError, setErrors] = useState(false)

  async function FetchItems() {
    try {
      const opts = {
        headers: {
          'Subscription-Key': config.SUBSCRIPTION_KEY
        }
      }
      const resp = await fetch(`${config.BASE_URL}/coronavirus/stats/${props.countryCode}`, opts)

      const covidData = await resp.json()
      setData(covidData.stats.history)
    } catch (err) {
      setErrors(true)
    }
  }
  useEffect(() => {
    FetchItems()
  }, FetchItems)

  const confirmedCases = data.map(coronaData => coronaData.confirmed)
  const recoveredCases = data.map(coronaData => coronaData.recovered)
  const deaths = data.map(coronaData => coronaData.deaths)
  return (
    <div>
      <h2>Current Situation In {props.name}</h2>
      <Line
        data={{
          labels: data.map(coronaData => coronaData.date),
          datasets: [
            {
              label: 'Confirmed',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'dodgerblue',
              borderColor: 'dodgerblue',
              borderCapStyle: 'round',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'bevel',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: confirmedCases
            },
            {
              label: 'Recovered',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'green',
              borderColor: 'green',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'bevel',
              pointBorderColor: 'rgb(0, 202, 0)',
              pointBackgroundColor: 'rgb(0, 202, 0)',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'greenyellow',
              pointHoverBorderColor: 'lime',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: recoveredCases
            },
            {
              label: 'Deaths',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'orangered',
              borderColor: 'orangered',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'bevel',
              pointBorderColor: 'maroon',
              pointBackgroundColor: 'maroon',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'red',
              pointHoverBorderColor: 'red',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: deaths
            }
          ]
        }}
      />
      {hasError && <p>Sorry Please try again</p>}
    </div>
  )
}
export default Charts
