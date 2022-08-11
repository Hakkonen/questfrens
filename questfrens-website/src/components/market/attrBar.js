import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { SliderValueLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

export default function AttrBar(props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [checked, setChecked] = React.useState([0]);

    // Handles checkbox toggles
    const handleToggle = (value, key) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
    
        if (currentIndex === -1) {
            newChecked.push(value);

            // Update filter
            let values = Object.values(props.filters[key])
            values.push(value)

            props.setFilters({
                ...props.filters, 
                [key]: values
            })
        } else {
            // // Remove items from filter
            // console.log(key, value)
            // console.log(props.filters)
            let values = Object.values(props.filters[key])
            let newarr = values.filter(a => a !== value)

            props.setFilters({
                ...props.filters, 
                [key]: newarr
            })

            newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby={props.name}
        >
            <ListItemButton onClick={handleClick}>
                {/* <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon> */}
                <ListItemText primary={props.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon> */}
                    {
                        props.values.map((value) => {
                            // button label
                            const labelId = `checkbox-list-label-${props.name}-${value}`;

                            return (
                                <ListItemButton sx={{ pl: 4 }} role={undefined} onClick={handleToggle(value, props.name)}>
                                    {/* <ListItemText primary={value} /> */}
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            // checked={checked.indexOf(value) !== -1}
                                            checked={Object.values(props.filters[props.name]).includes(value)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={value} primary={value} />
                                </ListItemButton>
                        )}
                        )
                    }
                </List>
            </Collapse>
        </List>
    );
}
