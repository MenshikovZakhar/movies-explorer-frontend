import './More.css';

export const More = ({ addCounter }) => {
    return (
        <section className='more'>
            <button type='button' className='more__button' onClick={addCounter}>
                Ещё
            </button>
        </section>
    );
};