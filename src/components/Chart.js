import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
// import { PropTypes } from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart({ dataProp }) {
  const renderComponent = () => {
    if (!dataProp) {
      return;
    }
    return (
      <div style={{ width: "100%" }}>
        <Pie data={data} options={options} />
      </div>
    );
  };

  const categoryNames =
    dataProp && dataProp.map((item) => item.transactionCategory.name);
  const totalExpenses =
    dataProp && dataProp.map((item) => parseFloat(item.total));

  const categoryColors = categoryNames.map(() => randomColor());

  const data = {
    labels: categoryNames,
    datasets: [
      {
        data: totalExpenses,
        backgroundColor: categoryColors,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Expense Breakdown",
        font: {
          size: 22,
        },
      },
    },
    legend: {
      display: true,
      position: "bottom",
    },
  };
  return renderComponent();
}

// Chart.propTypes = {
//   dataProp: PropTypes.arrayOf(
//     PropTypes.shape({
//       total: PropTypes.string.isRequired,
//       transactionCategory: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//       }).isRequired,
//     })
//   ).isRequired,
// };
