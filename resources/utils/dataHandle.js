function toCamelCase( str ) {
	return str.replace( /-([a-z])/g, function ( g ) {
		return g[ 1 ].toUpperCase();
	} );
}

function mapAllKeysRecursive( json ) {
	const newObj = {};
	Object.keys( json ).forEach( function ( key ) {
		const newKey = toCamelCase( key );
		if ( !json[ key ] ) {
			newObj[ newKey ] = undefined;
		} else if ( Array.isArray( json[ key ] ) ) {
			newObj[ newKey ] = json[ key ];
		} else if ( typeof json[ key ] === 'object' ) {
			newObj[ newKey ] = mapAllKeysRecursive( json[ key ] );
		} else {
			newObj[ newKey ] = json[ key ];
		}
	} );
	return newObj;
}

function spliceStrElement( str, elType ) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	const elementArray = Array.from(doc.getElementsByTagName(elType));
	return elementArray;
}

function convLi2Div(el) {
	const div = document.createElement('div');
	for (let i = 0; i < el.attributes.length; i++) {
		const attribute = el.attributes[i];
		div.setAttribute(attribute.name, attribute.value);
	  }
	  div.innerHTML = el.innerHTML;
	return div;
}

exports.toCamelCase = toCamelCase;
exports.mapAllKeysRecursive = mapAllKeysRecursive;
exports.spliceStrElement = spliceStrElement;
exports.convLi2Div = convLi2Div;