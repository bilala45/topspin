import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Container,
  Link,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
//emojis
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
// utils for surface and defining round
import { setMatchSurfacePath, defineRound } from "../utils";
import Tooltip from "@mui/material/Tooltip";

// declare server port and host for requests
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function TournamentPage() {
  const { name, league, date} = useParams(); // route parameters for tournament id
  //const [tournament, setTournamentStats] = useState([]); // info about given tournament
  const [matches, setTournamentMatches] = useState([]); //all matches for a given tournament id
  const [decade_stats, setTournamentDecadeStats] = useState([]); //all matches for a given tournament id
  const [alltime_state, setTournamentStats] = useState([]); //all matches for a given tournament id

  // use effect to send GET req to /tournament/:id for tournament data, and decade stats
  useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/tournament/${name}/${league}/${date}`)
      .then((res) => res.json())
      .then((resJson) => {
        setTournamentMatches(resJson);
      })
      .catch((err) => console.log(err));

    /* 
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/tournament/stats/${name}/2013`)
      .then((res) => res.json())
      .then((resJson) => {
        setTournamentDecadeStats(resJson);
      })
    .catch((err) => console.log(err));
    */
  }, []); // run on initial render

  useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/tournament/stats/${name}/2014/${league}`)
      .then((res) => res.json())
      .then((resJson) => {
        setTournamentDecadeStats(resJson);
      })
    .catch((err) => console.log(err));

    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/api/tournament/stats/${name}/all/both`)
      .then((res) => res.json())
      .then((resJson) => {
        setTournamentStats(resJson);
      })
    .catch((err) => console.log(err));
  }, [])

  // get year from date
  const year = new Date(date).getFullYear();

  // tournament surface
  //const tournament_surface = tournament ? tournament.surface : "Loading...";
  const tournament_surface = matches.length > 0 ? matches[0].surface : "Loading...";
  const id = matches.length >0 ? matches[0].id : 0;
  const winner = matches.length >0 ? matches[0].winner : 'Loading...';
  const winnerID = matches.length >0 ? matches[0].winnerID : '108439';
  const winningestID = decade_stats.length > 0 ? decade_stats[0].player_id : '12034'
  const winningest = decade_stats.length > 0 ? decade_stats[0].record_holder : 'Loading...'
  const winningestRecord = decade_stats.length > 0 ? decade_stats[0].Record : '12034'
  const winningestID_alltime = alltime_state.length > 0 ? alltime_state[0].player_id : '12034'
  const winningest_alltime = alltime_state.length > 0 ? alltime_state[0].record_holder : 'Loading...'
  const winningestRecord_alltime = alltime_state.length > 0 ? alltime_state[0].Record : '12034'

    return (
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 300,
              letterSpacing: ".2rem",
            }}
            gutterBottom
          >
            {name + " " + year + ": " + league.toUpperCase()}
          </Typography>
          <Tooltip title={`Surface: ${tournament_surface}`}>
            <img
              src={setMatchSurfacePath(tournament_surface)}
              alt={`Surface: ${tournament_surface}`}
              style={{ maxWidth: "20%", borderRadius: "10px" }}
            />
          </Tooltip>

        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 100,
              letterSpacing: ".2rem",
            }}
          >
            Stats
          </Typography>
        </div>
        <div>
          <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6} md={3}>
            <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", textAlign: 'center', marginBottom: '10px'}}>
            <Typography variant="h5" style={{ color: "#FFD700" }}>
              <EmojiEventsIcon/> Winner:
            </Typography>
            <Typography variant="h6">
            <Link href={`/player/${winnerID}`} 
              style={{ color: "inherit", textDecoration: "none" }}
              onMouseOver={(e) => {
                          e.target.style.color = "#008000";
                          e.target.style.textDecoration = "none";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = "inherit";
                          e.target.style.textDecoration = "none";
                        }}>
                {winner}
              </Link>
            </Typography>
            </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={6} md={3}>
            <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", textAlign: 'center' }}>
            <Typography variant="h6">
              Record Holder (Last Decade):
            </Typography>
            <Typography variant="subtitle1">
            <Link href={`/player/${winningestID}`} 
              style={{ color: "inherit", textDecoration: "none" }}
              onMouseOver={(e) => {
                          e.target.style.color = "#008000";
                          e.target.style.textDecoration = "none";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = "inherit";
                          e.target.style.textDecoration = "none";
                        }}>
                {winningest}
              </Link>
            </Typography>
            <Typography variant="subtitle2">
            with
            </Typography>
            <Typography variant="subtitle1">
            {winningestRecord} win(s)
            </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", textAlign: 'center' }}>
            <Tooltip title={`Across League and Gender`}>
            <Typography variant="h6">
              G.O.A.T.:
            </Typography>
            </Tooltip>
            <Typography variant="subtitle1">
            <Link href={`/player/${winningestID_alltime}`} 
              style={{ color: "inherit", textDecoration: "none" }}
              onMouseOver={(e) => {
                          e.target.style.color = "#008000";
                          e.target.style.textDecoration = "none";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = "inherit";
                          e.target.style.textDecoration = "none";
                        }}>
                {winningest_alltime}
              </Link>
            </Typography>
            <Typography variant="subtitle2">
            with
            </Typography>
            <Typography variant="subtitle1">
            {winningestRecord_alltime} win(s)
            </Typography>
            </div>
          </Grid>
        </Grid>
        </div>
        <div style = {{ textAlign: "center", marginTop: "20px", marginBottom: "10px" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 100,
              letterSpacing: ".2rem",
            }}
          >
            Matches
          </Typography>
        </div>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={5}>
          <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
            <Table
              sx={{
                minWidth: 300,
                borderCollapse: "separate",
                borderSpacing: "0 6px",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Round
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd" }}
                  >
                    Matchup
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.match_num}>
                    <TableCell component="th" scope="row">
                      {defineRound(match.round)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/tournament/${id}/${match.match_num}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                        onMouseOver={(e) => {
                          e.target.style.color = "#008000";
                          e.target.style.textDecoration = "none";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = "inherit";
                          e.target.style.textDecoration = "none";
                        }}
                      >
                        {match.winner} vs {match.loser}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
    );
}