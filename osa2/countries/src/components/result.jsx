const Result = ({ result }) => (
    <div>
        <h1>{result.name.common}</h1>
        <p><b>Capital:</b> {result.capital[0]}</p>
        <p><b>Area:</b> {result.area}</p>
        <h3>Languages:</h3>
        <ul>
            {Object.values(result.languages).map(lang =>
                <li key={lang}>{lang}</li>
            )}
        </ul>
        <img src={result.flags.png} alt="Kuva" />
    </div>
)

export default Result
