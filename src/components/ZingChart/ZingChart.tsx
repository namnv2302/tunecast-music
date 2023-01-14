import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './ZingChart.module.scss';
import TopZingChart from './components/TopZingChart';
import { getZingChart } from '~/apis/homeApi';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Legend,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);

function ZingChart() {
    const { data, status } = getZingChart();

    const getEncodeId = useCallback(
        (number: number) => {
            if (data) {
                return data?.items[number]?.encodeId;
            }
        },
        [data],
    );

    const chart1 = useMemo(() => {
        if (data && status === 'success') {
            return data?.chart?.items[getEncodeId(0)];
        }
    }, [data, status, getEncodeId]);

    const chart2 = useMemo(() => {
        if (data && status === 'success') {
            return data?.chart?.items[getEncodeId(1)];
        }
    }, [data, status, getEncodeId]);

    const chart3 = useMemo(() => {
        if (data && status === 'success') {
            return data?.chart?.items[getEncodeId(2)];
        }
    }, [data, status, getEncodeId]);

    const labels = useMemo(() => {
        if (data && status === 'success') {
            return data?.chart?.times.map((item: any) => `${item.hour}:00`);
        }
    }, [data, status]);

    const options = {
        animations: {
            radius: {
                duration: 500,
                easing: 'linear',
                loop: (context: any) => context.active,
            },
        },
        datasetStrokeWidth: 10,
        pointDotStrokeWidth: 10,
        tooltipFillColor: 'rgb(0,0,0)',
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        tooltips: {
            enabled: true,
            mode: 'x-axis',
            intersect: false,
            padding: 2,
            caretPadding: 4,
            usePointStyle: true,
        },
        hover: {
            mode: 'dataset',
            intersect: false,
            includeInvisible: true,
        },
        scales: {
            y: {
                min: -100,
                max: `${data?.chart?.maxScore}`,
                display: false,
            },
            x: {
                ticks: {
                    callback: function (val: any, index: any): any {
                        return index % 2 === 0 ? labels[val] : null;
                    },
                    padding: 2,
                    textStrokeColor: '#fff',
                    color: '#96979B',
                },
                alignToPixels: true,
            },
        },
    };

    const data2 = {
        labels,
        datasets: [
            {
                label: data ? data?.items[0]?.title : '',
                data: chart1?.map((item: any) => item.counter),
                borderColor: '#4a90e2',
                backgroundColor: '#fff',
                tension: 0.5,
                borderWidth: 2,
                pointBorderWidth: 3,
                pointRadius: 3,
                pointHoverBackgroundColor: '#4a90e2',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5.5,
                hoverRadius: 12,
                hoverBorderWidth: 3,
                order: 1,
            },
            {
                label: data ? data?.items[1]?.title : '',
                data: chart2?.map((item: any) => item.counter),
                borderColor: '#50e3c2',
                backgroundColor: '#fff',
                tension: 0.5,
                borderWidth: 2,
                pointBorderWidth: 3,
                pointRadius: 3,
                pointHoverBackgroundColor: '#50e3c2',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5.5,
                hoverRadius: 12,
                hoverBorderWidth: 3,
                order: 2,
            },
            {
                label: data ? data?.items[2]?.title : '',
                data: chart3?.map((item: any) => item.counter),
                borderColor: '#e35050',
                backgroundColor: '#fff',
                tension: 0.5,
                borderWidth: 2,
                pointBorderWidth: 3,
                pointRadius: 3,
                pointHoverBackgroundColor: '#e35050',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5.5,
                hoverRadius: 12,
                hoverBorderWidth: 3,
                order: 3,
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className="grid">
                        <div className="row">
                            <div className="col l-5">
                                <header className={cx('head')}>
                                    <Link to="/">#zingchart</Link>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faCirclePlay} />
                                    </span>
                                </header>
                                {data && <TopZingChart topZingCharts={data.items} />}
                            </div>
                            <div className="col l-7">
                                <div className={cx('zing-chart')}>
                                    <Chart
                                        updateMode="resize"
                                        style={{ width: '100%' }}
                                        type="line"
                                        options={options}
                                        data={data2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZingChart;
