import styles from "./Table.module.css";
import { useContext } from "react";
import { CarparkContext } from "../Context/CarparkContext";

function Table({ results }) {

const cp = useContext(CarparkContext);

    return (
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Carpark number</th>
              <th>Address</th>
              <th>Distance</th>
              <th>Lots available</th>
              <th>Last updated</th>
              <th>Free parking</th>
              <th>Night parking</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, i) => (
              
                (!cp.toggleNight || item.night_parking === 'YES') && (!cp.toggleFree || item.free_parking !== 'NO') && <tr key={i}>
                  <td>{item.carpark_number}</td>
                  <td>{item.address}</td>
                  <td>{item.distance} KM</td>
                  {/* <td>{item.carpark_info.lots_available}</td> */}
                  {item.carpark_info.map((item2, j) => (
                    <tr key={j}>
                      <td>{item2.lots_available}</td>
                    </tr>
                  ))}
                  <td>{item.update_datetime}</td>
                  <td>{item.free_parking}</td>
                  <td>{item.night_parking}</td>
                </tr>
              
            ))}
          </tbody>
        </table>
        <br></br>
        <p>{results.length} results</p>
        <br></br>
      </div>
    );
  }
  export default Table;