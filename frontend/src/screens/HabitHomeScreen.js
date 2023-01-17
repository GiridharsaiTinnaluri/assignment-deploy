import Milestone from '../Components/Milestone';
import CreateHabit from '../Components/CreateHabit';
import TodayHabits from '../Components/TodayHabits';

const HabitHomeScreen= () => {
    return <>

        {/* mileStone comonent */}
        <Milestone /> <br/>

        {/* habit component */}
        {/* Create habit component */}
        <CreateHabit /> <br/>

        {/* today habits component */}
        {/* Gets all Habits should peerform current day */}
        <TodayHabits /> <br/>
    </>
}

export default HabitHomeScreen;