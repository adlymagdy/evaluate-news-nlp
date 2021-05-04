function analysisContent(link, res) {
  const content = `
  <div id="response">
      <div class="response__container">
          <h2>Sentiment Analysis</h2>
          <p>
              <span>source:</span>
              <span>${link}</span>
          </p>
          <ul>
              <li>
                  <span class="category">agreement:</span>
                  <span class="score">${res.agreement}</span>
              </li>
              <li>
                  <span class="category">confidence:</span>
                  <span class="score">${res.confidence}</span>
              </li>
              <li>
                  <span class="category">irony:</span>
                  <span class="score">${res.irony}</span>
              </li>
              <li>
                  <span class="category">subjectivity:</span>
                  <span class="score">${res.subjectivity}</span>
              </li>
          </ul>
      </div>
      </div>
  </section>`;
  return content;
};

export { analysisContent };