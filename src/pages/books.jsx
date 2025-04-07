import '../../src/App.css'
import Layout from '../components/layout'
import Books from '../components/books/home'

function BooksByFounder (){
    return (
            <div className="bg-black overflow-x-hidden font-instrument">
                <Books />
            </div>
    );
}

export default BooksByFounder;