import Result from './result'

const Results = ({ results, handler }) => {
    if (results.length > 10) {
        return (
            <div>
                <p>Too many matches, please specify filter</p>
            </div>
        )
    } else if (results.length == 1) {
        return (
            <Result result={results[0]} />
        )
    } else {
        return (
            <div>
                {results.map(country =>
                    <p key={country.cca2}>
                        {country.name.common}
                        {' '}
                        <button onClick={handler} value={country.name.common}>Show</button>
                    </p>
                )}
            </div>
        )
    }
}

export default Results
