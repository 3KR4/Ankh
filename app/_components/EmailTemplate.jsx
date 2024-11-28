export default function EmailTemplate({ fullName, email, state, planName, agent, dataTeam, resources, acquisitionTeam, totalprice, baseAmount, acqTotal, OptionDiscount, savedAmount, recipientType }) {
  return (
    <div style={{ background: '#f7f7f7', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', background: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '35px', textAlign: 'center' }}>
        {/* f7f7f7 ffffff */}
        {/* Header Section */}
        <div style={{ borderBottom: '2px solid #e0be40', paddingBottom: '20px', marginBottom: '20px' }}>
          <img src="https://www.ankhcallcenter.com/favicon.ico" alt="Ankh Logo" style={{ width: '80px', height: '80px', marginBottom: '10px' }} />
          <h1 style={{ color: '#333333', fontSize: '36px', margin: '0', fontWeight: '600' }}>ANKH</h1>
          <h2 style={{ color: '#e0be40', fontSize: '24px', margin: '0', fontWeight: '400' }}>{recipientType == 'company' ? "New Purchase"  : "Payment Successful!"}</h2>
        </div>

        {/* Client Info */}
        {recipientType == 'company' && (
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h3 style={{ color: '#333', fontSize: '20px', margin: '0 0 10px' }}>Client Information</h3>
            <p style={{ color: '#555', margin: '5px 0', fontSize: '16px' }}>
              <strong>Name:</strong> {fullName}
            </p>
            <p style={{ color: '#555', margin: '5px 0', fontSize: '16px' }}>
              <strong>Email:</strong> <span style={{ color: '#e0be40' }}>{email}</span>
            </p>
            <p style={{ color: '#555', margin: '5px 0', fontSize: '16px' }}>
              <strong>State:</strong> {state == 'Select Your State' ? 'No state Selected' : state}
            </p>
          </div>
        )}
        {/* Plan Details */}
        <div style={{ textAlign: 'left' }}>
        {recipientType == 'company' && (
          <h3 style={{ color: '#333', fontSize: '20px', margin: '0 0 10px' }}>Plan Details</h3>
        )}
          <p style={{ color: '#555', fontSize: '16px' }}>
            <strong>Plan Name:</strong> <span style={{ color: '#e0be40', fontSize: '22px', fontWeight: '600' }}>{planName}</span>
          </p>
          <p style={{ color: '#555', fontSize: '16px', width: '100%', position: 'relative' }}>
            <strong>Agents:</strong> {agent} {agent === 1 ? 'agent' : 'agents'} <span style={{position: 'absolute', right: '0'}}>${baseAmount * agent}</span>
          </p>
          {savedAmount !== 0 && (
            <p style={{ color: '#555', fontSize: '16px', width: '100%', position: 'relative' }}>
              <strong>{OptionDiscount}% Discount</strong> <span style={{position: 'absolute', right: '0'}}>-${savedAmount}</span>
            </p>
          )}
          {dataTeam?.length > 0 && (
            <p style={{ color: '#555', fontSize: '16px', width: '100%', position: 'relative' }}>
              <strong>Data Records:</strong> {dataTeam.dataNumber} <span style={{position: 'absolute', right: '0'}}>${dataTeam.price}</span>
            </p>
          )}
          
          <div>
            <h4 style={{ color: '#333', fontSize: '18px', margin: '10px 0 5px' }}>Resources</h4>
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px', margin: '5px 0', color: '#555' }}>
              {resources.map(x => (
                <li key={x} style={{ marginBottom: '5px', fontSize: '16px' }}>{x}</li>
              ))}
            </ul>
          </div>

        {acquisitionTeam?.length > 0 && (
          <div>
            <h4 style={{ color: '#333', fontSize: '18px', margin: '10px 0 5px' }}>AcquisitionTeam</h4>
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px', margin: '5px 0', color: '#555' }}>
              <li key={acquisitionTeam[0].name} style={{ marginBottom: '5px', fontSize: '16px', width: '100%', position: 'relative' }}>
                {acquisitionTeam.length === 3 ? 'All Acquisition Team Package' : acquisitionTeam.length === 2 ? `${acquisitionTeam[0].name} & ${acquisitionTeam[1].name} ` : acquisitionTeam[0].name} 
                <span style={{position: 'absolute', right: '0'}}>${acqTotal}</span>
              </li>
            </ul>
          </div>
        )}


          {/* Total Price */}
          <div style={{ borderTop: '2px solid #e0be40', paddingTop: '20px', marginTop: '20px', textAlign: 'center' }}>
            <h2 style={{ color: '#333', fontSize: '24px', margin: '0', fontWeight: '600' }}>
              Total Price: <span style={{ color: '#e0be40' }}>${totalprice}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
