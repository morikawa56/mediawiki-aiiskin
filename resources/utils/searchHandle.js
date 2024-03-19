/* These function are refered from https://doc.wikimedia.org/codex/latest/components/demos/typeahead-search.html */
function fetchResults( searchTerm, offset, domain ) {
    const params = new URLSearchParams( {
        action: 'query',
        list: 'search',
        srlimit: 10,
        srsearch: searchTerm,
        utf8: '',
        format: 'json'
    } );
    if ( offset ) {
        params.set( 'sroffset', `${ offset }` );
    }
    return fetch( `${ domain }/api.php?${ params.toString() }` )
        .then( ( response ) => response.json() );
}

/**
 * Format search results for consumption by TypeaheadSearch.
 *
 * @param pages
 * @return
 */
function adaptApiResponse( pages ) {
    return pages.map( ( { ns, pageid, size, snippet, timestamp, title, wordcount } ) => ( {
        value: pageid,
        label: title,
        url: `${ mw.config.get('wgServer') }/index.php?title=${title}`
    } ) );
}

function deduplicateResults( results ) {
    const seen = new Set( searchResults.value.map( ( result ) => result.value ) );
    return results.filter( ( result ) => !seen.has( result.value ) );
}

module.exports = { fetchResults, adaptApiResponse, deduplicateResults }