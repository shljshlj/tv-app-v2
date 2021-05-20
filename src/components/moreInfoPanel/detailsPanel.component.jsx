const DetailsPanel = ({ country, language, releaseDate, status }) => {
  return (
    <section className="panel details__panel">
      <div className="panel__heading details__heading">
        <h4>Series Details</h4>
      </div>
      <table className="details__table">
        <tbody>
          <tr>
            <td>Country:</td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>{language}</td>
          </tr>
          <tr>
            <td>Release Date:</td>
            <td>{releaseDate}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{status}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DetailsPanel;