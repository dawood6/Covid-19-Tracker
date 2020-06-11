import React, { useEffect, useState } from 'react'
import './Home.css'
import corona from './images/Corona.png'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Charts from './Charts/Chart'
import config from '../config'
import Cards from './Cards/Cards'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(5),
        minWidth: 150
    }
}))

const Home = () => {
    const classes = useStyles()
    const [selectedCountry, setCountry] = useState("")
    const [data, setData] = useState([])
    const [hasError, setErrors] = useState(false)
    const [show, setShow] = useState()

    async function FetchItems() {
        try {
            const opts = {
                headers: {
                    'Subscription-Key': config.SUBSCRIPTION_KEY
                }
            }
            const resp = await fetch(`${config.BASE_URL}/coronavirus/stats/global`, opts)
            const covidData = await resp.json()
            setData(covidData.stats.breakdowns)
        } catch (err) {
            setErrors(true)
        }
    }

    useEffect(() => {
        FetchItems()
    }, [])

    const handleChange = (e) => {
        setCountry(e.target.value)
        setShow(true)
    }
    // eslint-disable-next-line
    const { countryOrRegion, country, isoCode, lat, long, provinceorState } = selectedCountry
    const filtered = data.filter(countryArr => countryArr.location.countryOrRegion === countryOrRegion)

    const filteredCountry = filtered.map(item => item.location.countryOrRegion)
    const filteredConfirm = filtered.map(item => item.totalConfirmedCases)
    const filteredRecovered = filtered.map(item => item.totalRecoveredCases)
    const filtereddeaths = filtered.map(item => item.totalDeaths)
    return (
        <div>
            <h1 className='head-1'>C<span className='corona_anime'><img src={corona} alt='corona virus' /></span>VID-19</h1>
            <div className='selection'>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='grouped-select'>Select Country</InputLabel>
                    <Select id='grouped-select' onChange={handleChange}>
                        {data.map(coronaData => <MenuItem key={coronaData.location.countryOrRegion} value={coronaData.location}>{coronaData.location.countryOrRegion}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <br />
            {show &&
                <div className='cards'>
                    <Cards name={filteredCountry} confirmedValue={filteredConfirm} recoveredValue={filteredRecovered} deathValue={filtereddeaths} />
                </div>}
            <br />
            {hasError && <p>Sorry Please try again</p>}
            {selectedCountry && <Charts name={countryOrRegion} countryCode={isoCode} />}
        </div>
    )
}

export default Home
