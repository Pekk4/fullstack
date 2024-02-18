import Result from './result'

const Results = ({ results }) => {
    if (results.length > 10) {
        return (
            <div>
                <p>Too many matches, please specify filter</p>
            </div>
        )
    } else if (results.length == 1) {
        const result = results[0]

        return (
            <div>
                <h1>{result.name.common}</h1>
                <p><b>Capital:</b> {result.capital[0]}</p>
                <p><b>Area:</b> {result.area}</p>
                <h3>Languages:</h3>
                <ul>
                    {Object.values(result.languages).map(lang =>
                        <Result key={lang} result={lang} />
                    )}
                </ul>
                <img src={result.flags.png} alt="Kuva" />
            </div>
        )
    } else {
        return (
            <div>
                {results.map(country =>
                    <p key={country.cca2}>
                        {country.name.common}
                    </p>
                )}
            </div>
        )
    }
}

export default Results
