import CountriesList from './countries/CountriesList';
import Form from './form/Form';
import { CountriesContext, CountryFormContext, regions } from '../../App';
import { Fragment, useContext, useEffect, useState } from 'react';
import AllCountriesButton from './all countries button/AllCountriesButton';
import Pages from './pages/Pages';
import NoResults from './no results/NoResults';
import ScrollTopButton from './scroll top button/ScrollTopButton';

function Home() {
  const countries = useContext(CountriesContext);
  const { countryForm } = useContext(CountryFormContext);
  const [currentPage, setCurrentPage] = useState(1);

  const showAllCountries = () =>
    countryForm.name === '' && countryForm.region === regions.All;

  const filterCountries = () => {
    const { name, region } = countryForm;
    if (showAllCountries()) return countries;
    if (region === regions.All)
      return countries.filter(country =>
        country.name.toLowerCase().includes(name.toLowerCase())
      );
    return countries.filter(
      country =>
        country.name.toLowerCase().includes(name.toLowerCase()) &&
        country.region === region
    );
  };
  const filteredCountries = filterCountries();

  useEffect(() => setCurrentPage(1), [countryForm.name, countryForm.region]);
  useEffect(() => {
    if (currentPage !== 1) document.querySelector('.pages').scrollIntoView();
  }, [currentPage]);

  const COUNTRIES_PER_PAGE = 40;
  const softwaresForCurrentPage = () => {
    const initialCountryIndexForCurrentPage = () =>
      (currentPage - 1) * COUNTRIES_PER_PAGE;
    return filteredCountries.slice(
      initialCountryIndexForCurrentPage(),
      initialCountryIndexForCurrentPage() + COUNTRIES_PER_PAGE
    );
  };

  return (
    <main className='main--home'>
      <div className='wrapper'>
        {showAllCountries() ? null : <AllCountriesButton />}
        <Form />
        {filteredCountries.length <= 0 ? (
          <NoResults />
        ) : (
          <Fragment>
            <CountriesList countries={softwaresForCurrentPage()} />
            <Pages
              totalItems={filteredCountries.length}
              itemsPerPage={COUNTRIES_PER_PAGE}
              currentPage={currentPage}
              updateCurrentPage={setCurrentPage}
            />
          </Fragment>
        )}
        <ScrollTopButton />
      </div>
    </main>
  );
}

export default Home;