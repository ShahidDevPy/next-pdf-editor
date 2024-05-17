// /components/EditText.tsx
"use client"; // Ensure this is a client component

import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const EditText = () => {
    const [text, setText] = useState<string>(() => {
        // Retrieve text from local storage if available
        const storedText = localStorage.getItem('editedText');
        return storedText || `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.

      Ut scelerisque hendrerit tellus, ut interdum risus vulputate sit amet. Fusce volutpat justo eget felis sollicitudin vulputate. Aliquam erat volutpat. Etiam accumsan lectus vitae interdum semper. Nulla facilisi. Nullam lobortis dolor ut venenatis ultricies. Integer velit purus, faucibus vel viverra vel, mattis ut lectus. Nulla facilisi. Phasellus interdum est massa, non volutpat nunc vestibulum ac. Praesent in dolor vel felis suscipit venenatis vel non velit. Curabitur convallis, orci nec facilisis viverra, lectus nisl consectetur dolor, sed efficitur magna ligula non neque.

      Cras faucibus est a lacus laoreet laoreet. Phasellus a velit venenatis, rhoncus magna non, commodo velit. Fusce suscipit sapien a justo feugiat tincidunt. Duis tincidunt, dolor sit amet dapibus pharetra, sapien arcu aliquet augue, eget hendrerit odio sapien non nisi. Cras vitae purus mauris. Sed tristique, ex sit amet congue scelerisque, ex arcu lobortis diam, a tincidunt est lacus id purus. Mauris vitae sapien a nulla convallis tincidunt. Sed a congue lorem, a gravida arcu. Nam ac quam id metus consectetur suscipit. Curabitur sagittis libero et dui ultricies, id venenatis sapien faucibus. Donec accumsan scelerisque velit, in consectetur felis vehicula a. Mauris nec felis vel felis convallis fermentum in non erat. Curabitur convallis, nulla vitae varius vulputate, libero massa volutpat orci, nec pharetra elit est nec urna.

      Vivamus non orci ac lacus ullamcorper bibendum a sed est. Aenean nec lorem ut risus egestas convallis. Nam sit amet felis in mauris dapibus condimentum. Proin bibendum sollicitudin ante, nec pharetra odio volutpat ut. Nullam vehicula magna quis magna consectetur, sed volutpat dui dapibus. Quisque varius euismod enim, non cursus magna fringilla sed. Cras porttitor, sapien sit amet venenatis luctus, nisi mauris suscipit ligula, quis bibendum tortor velit ut urna. Praesent nec felis egestas, ultrices ex ut, sollicitudin augue. Donec sed facilisis justo, sit amet congue urna. Donec dapibus auctor magna, vitae cursus nunc pretium non. Integer in egestas tortor. Pellentesque varius quam vel volutpat porta. Duis vestibulum libero nulla, in consectetur purus placerat nec.
    `;
    });
    const [loaded, setLoaded] = useState(false); // Flag to indicate if saved text has been loaded

    const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
        // Retrieve text from local storage if available after component mounts
        const storedText = localStorage.getItem('editedText');
        if (storedText) {
            setText(storedText);
        }
        setLoaded(true); // Set loaded flag to true
    }, []); // Empty dependency array ensures useEffect runs only once after mount

    useEffect(() => {
        // Save the text to local storage whenever it changes
        if (loaded) {
            localStorage.setItem('editedText', text);
        }
    }, [text, loaded]);

    const applyHighlight = (color: string) => {
        if (!quillRef.current) return;

        const selection = quillRef.current.getEditor().getSelection();
        if (!selection) return;

        const range = selection.index;
        const length = selection.length;

        quillRef.current.getEditor().formatText(range, length, 'background', color);
    };

    return (
        <div>
            <div id="toolbar">
                <select className="ql-color">
                    <option value="yellow">Yellow</option>
                    <option value="lightgreen">Green</option>
                    <option value="lightblue">Blue</option>
                </select>
                <button onClick={() => applyHighlight('yellow')}>Highlight Yellow</button>
                <button onClick={() => applyHighlight('lightgreen')}>Highlight Green</button>
                <button onClick={() => applyHighlight('lightblue')}>Highlight Blue</button>
            </div>
            <ReactQuill
                ref={quillRef}
                value={text}
                onChange={setText}
                theme="snow"
            />
        </div>
    );
};

export default EditText;
