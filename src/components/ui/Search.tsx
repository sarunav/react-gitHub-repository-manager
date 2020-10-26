import React, { useState } from 'react'

interface SearchParams {
    type: string;
    getQuery: any;
}

const Search = ({ type, getQuery }: SearchParams) => {
    const [text, setText] = useState<string>('');

    const placeHolder = (type === 'repository-search') ? 'Search github repository' : 'Search github user';

    const onChange = (q: any) => {
        setText(q);
        getQuery(q);
    }


    return (
        <section className="search">
            <form>
                <input type="text" className="form-control" placeholder={placeHolder}
                value={text}
                onChange={(e: any) => onChange(e.target.value)}
                autoFocus
                />
            </form>
        </section>
    )
}

export default Search
