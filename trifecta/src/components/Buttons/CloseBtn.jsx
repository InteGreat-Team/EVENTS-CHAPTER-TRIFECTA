export default function CloseBtn({ closeModal, type }) {
	const handleDiscardChanges = () => {
		if (type === 'discard') {
			closeModal()
		} else if (type === 'cancel') {
			closeModal()
		} else if (type === 'goBack') {
			closeModal()
		} else if (type === 'close') {
			closeModal()
		}
	}

	return (
		<div className="justify-center w-1/2">
			<button
				type="button"
				onClick={handleDiscardChanges}
				className="bg-red-dark hover:bg-red-700 w-[100%] text-white font-bold py-2 px-2 text-sm rounded focus:outline-none focus:shadow-outline whitespace-nowrap"
			>
				{type === 'discard'
					? 'Discard'
					: type === 'cancel'
					? 'Cancel'
					: type === 'close'
					? 'Close'
					: 'Go Back'}
			</button>
		</div>
	)
}
