import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import ReactWhatsapp from 'react-whatsapp';

function SosHelp({ user }) {
  const [nominatedPerson, setnominatedPerson] = useState(null);
  const [sosUser, setSosUser] = useState({
    name: '',
    hp: '',
  });
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const personInStorage = JSON.parse(localStorage.getItem('nominee'));
    if (personInStorage) {
      setnominatedPerson(() => personInStorage);
      setTrigger(true);
    } else {
      setnominatedPerson(() => null);
      setTrigger(false);
    }
  }, []);

  const handleChange = (e) => {
    setSosUser({ ...sosUser, [e.target.name]: e.target.value });
  };

  const nominate = () => {
    if (sosUser.name !== '' && sosUser.hp.length > 7) {
      localStorage.setItem('nominee', JSON.stringify(sosUser));
      setnominatedPerson(sosUser);
      setTrigger(true);
      setSosUser({ name: '', hp: '' });
    } else {
      setTrigger(false);
      Swal.fire({
        title: 'Oppss',
        text: 'Please enter al details above',
        confirmButtonText: 'Okay!',
      });
    }
  };

  const clearNominee = () => {
    localStorage.clear('nominee');
    setnominatedPerson(null);
    setTrigger(false);
  };

  const message = `Help! Help! I'm in trouble! Please come find me thru this link - \n http://localhost:3000/help/${user.location}/${user.name}`;

  return (
    <div>
      {!trigger ? (
        <div className="mt-4 hidden lg:block">
          <p className="text-lg font-semibold text-pink-400">
            2. *** New *** Seek help with 2 clicks!
          </p>
          <p className="text-md text-green-200">
            Seek help when you need it! Assign a nominee and send your location
            to him/her whenever there is an emergency!
          </p>
          <h1 className="mt-6 font-semibold text-lg">
            Enter nominee's particulars:
          </h1>
          <input
            onChange={handleChange}
            name="name"
            value={sosUser.name}
            type="text"
            placeholder="Name"
            className="input input-bordered input-primary w-full max-w-xs mt-3 text-gray-500"
          />
          <input
            onChange={handleChange}
            name="hp"
            value={sosUser.hp}
            type="text"
            placeholder="Exclude +65"
            className="input input-bordered input-primary w-full max-w-xs mt-3 text-gray-500"
          />
          <div className="flex justify-start mt-4 ml-2">
            <button onClick={nominate} className="btn btn-success btn-sm">
              Nominate
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-red-500 text-xl font-bold mb-3">GET HELP FROM: </p>
          <p className="font-bold mb-2 text-green-200 pl-2">
            NAME: {nominatedPerson?.name.toUpperCase()}
          </p>
          <p className="font-bold mb-6 text-green-200 pl-2">
            HP: {nominatedPerson?.hp.toUpperCase()}
          </p>
          <div className="flex gap-3">
            <ReactWhatsapp
              number={`+65${nominatedPerson?.hp}`}
              message={message}
            >
              <p className="btn btn-error btn-sm">Help!</p>
            </ReactWhatsapp>
            <button onClick={clearNominee} className="btn btn-warning btn-sm">
              Delete Nominated
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SosHelp;
