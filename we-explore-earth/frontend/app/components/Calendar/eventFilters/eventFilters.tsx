import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'expo-checkbox';
import { styles } from './styles'

function FilterHeader(
    {header}
    :
    {header: String}
){
    return(
        <View style={styles.filterHeaderWrapper}>
            <Text style={styles.filterHeader}>{header}</Text>
            <Text style={styles.reset}>Reset</Text>{/** TODO: Make reset button functional. */}
        </View>
    )
}

function FilterOption(
    {option}
    :
    {option: String}
){
    return(
        <View style={styles.filterOptionWrapper}>
            <Text style={styles.filterOption}>{option}</Text>
            <Checkbox
                // TODO: Sync checkboxes with options to toggle between checked and unchecked.
                // value={isChecked}
                // onValueChange={setIsChecked}
                // color={isChecked ? 'black' : 'mediumgrey'}
            />
        </View>
    )
}

function EventFilters() {
    const [dateOptions, setDateOptions] = useState<Array<String>>(['Today', 'Tomorrow', 'This Week']);
    const [selectedDates, setSelectedDates] = useState<any>({
        today: false,
        tomorrow: false,
        thisWeek: false
    }); // TODO: Might change structure. Depends on use case.

    const [categoryOptions, setCategoryOptions] = useState<Array<String>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Set<String>>(new Set<String>()); // TODO: Might change structure. Depends on use case.

    // TODO: For checkboxes
    // const [isChecked, setIsChecked] = useState(false)

    const handleSubmit = () => {
        // TODO
        // const startDate = null;
        // const endDate = null;
    }

    useEffect(() => {
        // TODO: Grab categories from backend. Placeholder below.
        setCategoryOptions(['Category 1', 'Category 2']);
    }, []);

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 20, paddingHorizontal: 20}}>
            <View>
                <Text style={styles.filterTitle}>Filter</Text>
                {dateOptions && dateOptions.length >= 0 &&
                    <>
                        <FilterHeader header='Date'/>
                        {dateOptions.map((option, index) => 
                            <FilterOption key={index} option={option}/>
                        )}
                    </>
                }
                {categoryOptions && categoryOptions.length >= 0 &&
                    <>
                        <FilterHeader header='Category'/>
                        {categoryOptions.map((option, index) => 
                            <FilterOption key={index} option={option}/>
                        )}
                    </>
                }
            </View>
        </SafeAreaView>
    );
}

export default EventFilters;