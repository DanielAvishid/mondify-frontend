import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export function MembersChart({ board }) {
    const members = board.members; // Extract your list of members from board

    // Create an array to store datasets for each member
    const datasets = members.map((member) => {
        const memberData = {
            fullname: member.fullname,
        };

        // Count tasks for each status for the current member
        board.groups.forEach((group) => {
            group.tasks.forEach((task) => {
                if (task.members.includes(member._id)) {
                    memberData[task.status] = (memberData[task.status] || 0) + 1;
                }
            });
        });

        return memberData;
    });

    // Extract all unique statuses from the datasets
    const allStatuses = new Set();
    datasets.forEach((data) => {
        Object.keys(data).forEach((key) => {
            if (key !== 'fullname') {
                allStatuses.add(key);
            }
        });
    });

    // Create a dataset for each status with titles and colors
    const statusDatasets = Array.from(allStatuses).map((status) => {
        // Find the status label information by ID
        const statusLabelInfo = board.statusLabels.find((label) => label.id === status);
        const labelTitle = statusLabelInfo ? statusLabelInfo.title : status;
        const labelColor = statusLabelInfo ? statusLabelInfo.color : `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        return {
            label: labelTitle,
            data: datasets.map((data) => data[status] || 0),
            backgroundColor: labelColor,
        };
    });

    const data = {
        labels: datasets.map((data) => data.fullname),
        datasets: statusDatasets,
    };

    const options = {
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#323338',
                    font: {
                        size: 16,
                    }
                }
            },
            y: {
                stacked: true,
                ticks: {
                    // display: false,
                    color: '#323338',
                    font: {
                        size: 16,
                    }
                }
            },
        },
        plugins: {
            legend: {
                // display: false,
            }
        }
    };

    return (
        <div className='members-chart-container'>
            <Bar
                data={data}
                options={options}
                className="custom-chart"
            />
        </div>
    );
}
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
// import { Bar } from 'react-chartjs-2'

// ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// export function MembersChart() {

//     const data = {
//         labels: ['Yes', 'No'],
//         datasets: [{
//             label: 'member done',
//             data: [3, 6],
//             backgroundColor: ['red'],
//         }, {
//             label: 'member not done',
//             data: [2, 2],
//             backgroundColor: ['blue'],
//         }]
//     }

//     const options = {
//         scales: {
//             x: {
//                 stacked: true
//             },
//             y: {
//                 stacked: true
//             }
//         }
//     }

//     return (
//         <div className='members-chart-container'>
//             <Bar
//                 data={data}
//                 options={options}
//             ></Bar>
//         </div>
//     )
// }