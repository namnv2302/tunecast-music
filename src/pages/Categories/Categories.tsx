import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
import AlbumList from '~/components/AlbumList';
import SongList from '~/components/SongList';

const cx = classNames.bind(styles);

function Categories() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('nav')}>
                    <li className={cx('active')}>Music</li>
                    <li>Podcast</li>
                    <li>Live</li>
                    <li>Radio</li>
                </ul>
                <SongList label="Recently Played" />
                <AlbumList label="Global Top 50" />
                <AlbumList label="Songs You Might Like" />
            </div>
        </div>
    );
}

export default Categories;
